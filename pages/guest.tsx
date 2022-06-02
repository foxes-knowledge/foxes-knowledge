import { LogoMain } from '@/assets/icons/Brand'
import { getCookie } from 'cookies-next'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import style from 'styles/guest.module.scss'

const Home: NextPage = () => {
    return (
        <div className={style.guestPage}>
            <div className={style.logoBlock}>
                <LogoMain width={256} />
                <h1>Foxes / Knowledge</h1>
            </div>
            <Link href="/signin">
                <a className={style.signBtn}>Sign in</a>
            </Link>
            <div className={style.tipBlock}>
                <h2>You must be invited in order to sign in</h2>
                <span>
                    Try asking your friends for an invitation,
                    <br />
                    if they use this service.
                </span>
            </div>
            <div className={style.faqList}>
                <h1>Frequently Asked Questions 🤔</h1>
                <div className={style.faqBlock}>
                    <h2>Why do I need an invitation?</h2>
                    <p>
                        This service is aimed for a specific group of people. In order to access it,
                        you must receive an invitation which only can be sent by existing members.
                    </p>
                </div>
                <div className={style.faqBlock}>
                    <h2>Why do I need an invitation?</h2>
                    <p>
                        This service is aimed for a specific group of people. In order to access it,
                        you must receive an invitation which only can be sent by existing members.
                    </p>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    if (!!getCookie('user', context))
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        }

    return {
        props: {},
    }
}

export default Home
