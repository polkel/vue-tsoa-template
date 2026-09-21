import { ResponseError } from "@polkel/shared/dist/client"
import { useAsyncState, type UseAsyncStateOptions } from "@vueuse/core"
import { reactive, ref, type MaybeRef, type Ref } from "vue"
import { Api as BackendApiClient } from "@polkel/shared"
import { config } from "@/config"

class Api extends BackendApiClient {
    constructor() {
        const cfg = config()
        super({ baseURL: cfg.apiUrl })
    }
}

export const api = new Api()

// Parses errors on useAsyncState to be used as convenient refs
export function useAsyncCaller<Data, Params extends any[] = any[], Shallow extends boolean = true>(
    promise: Promise<Data> | ((...args: Params) => Promise<Data>),
    initialState: MaybeRef<Data>,
    options?: UseAsyncStateOptions<Shallow, Data>
) {
    const errorStatusCode: Ref<number | null> = ref(null)
    const error: Ref<Error | null> = ref(null)
    const useAsyncStateRes = useAsyncState(promise, initialState, {
        // Set these as the new defaults for useAsyncState
        // Can be overridden if defined by options
        resetOnExecute: false,
        immediate: false,
        ...options,
        onError: async (e: unknown): Promise<void> => {
            let errorMessage = "An unknown error occurred."
            if (e instanceof ResponseError) {
                errorStatusCode.value = e.response.status
                const json = await e.response.json()
                if (json.message) {
                    errorMessage = json.message
                }
            } else if (e instanceof Error) {
                errorMessage = e.message
            }
            console.error(e)
            error.value = new Error(errorMessage)
            if (options?.onError) {
                options.onError(e)
            }
        },
        onSuccess: (_: Data): void => {
            errorStatusCode.value = null
            error.value = null
        }
    })
    return reactive({ ...useAsyncStateRes, errorStatusCode, error })
}
