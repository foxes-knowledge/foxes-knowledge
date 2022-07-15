import { Loading, Success, Warning } from '#/icons/Toast'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import style from './toaster.module.scss'

const ProviderContext = createContext<Toast>(null!)
export const useToast = () => useContext(ProviderContext)

interface ToastPromise {
    promise: Promise<Response>
    title?: string
    onSuccess?: (res: ResponseData) => void
    onError?: (err: ResponseData) => void
}

interface Toast {
    loading: (message?: string) => void
    success: (message?: string) => void
    error: (message?: string) => void
    promise: (params: ToastPromise) => void
    clear: () => void
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rendered, setRendered] = useState(false)
    const [title, setTitle] = useState('')
    const [icon, setIcon] = useState<any>(null)
    const [mounted, setMounted] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    const promise = ({ promise, title, onSuccess, onError }: ToastPromise) => {
        setTitle(title ? title : 'Processing...')
        setIcon(<Loading className={style.spinAnimation} />)
        setRendered(true)
        promise
            .then(async (res: Response) => {
                const json = (await res.json()) as ResponseData
                if (!res.ok) throw json
                success(json.message)
                onSuccess && onSuccess(json)
            })
            .catch((err: ResponseData) => {
                error(err.name === 'SyntaxError' ? 'Server offline' : err.message)
                onError && onError(err)
            })
    }

    const loading = (message?: string) => {
        message ? setTitle(message) : setTitle('Processing...')
        setIcon(<Loading className={style.spinAnimation} />)
        setRendered(true)
    }

    const success = (message?: string) => {
        message ? setTitle(message) : setTitle('Success')
        setIcon(<Success />)
        setRendered(true)
        setTimeout(clear, 5000)
    }

    const error = (message?: string) => {
        if (!message) setTitle('Something went wrong')
        else
            setTitle(
                Array.isArray(message)
                    ? () => {
                          let mergedMsg = ''
                          message.forEach((object: any) => {
                              for (const key in object) {
                                  const value = object[key]
                                  mergedMsg = `${mergedMsg}\n${key}:${value}`
                              }
                          })
                          return mergedMsg.trim()
                      }
                    : message
            )
        setIcon(<Warning />)
        setRendered(true)
        setTimeout(clear, 5000)
    }

    const clear = () => {
        if (!ref.current) return
        ref.current.className = `${style.toast} ${style.popDownAnimation}`
        ref.current.onanimationend = () => setRendered(false)
    }

    return (
        <>
            <ProviderContext.Provider
                value={{
                    loading,
                    success,
                    error,
                    promise,
                    clear,
                }}
            >
                {children}
            </ProviderContext.Provider>
            {mounted &&
                createPortal(
                    rendered && (
                        <div className={style.toastContainer} data-cy="toaster">
                            <div className={style.toast} ref={ref}>
                                {icon}
                                <span>{title}</span>
                            </div>
                        </div>
                    ),
                    document.getElementById('__next')!
                )}
        </>
    )
}
