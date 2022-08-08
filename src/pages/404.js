// 404.js
import Link from 'next/link'
import LinkButton from '../components/Button/LinkButton'

export default function NotFound() {
    return <>
        <div className="text-position-center">
            <h1 className="text-clr-highlight font-size-lg" style={{ marginBottom: 0 }}>404</h1>
            <hr style={{ border: 0, borderTop: '1px solid white', width: 30 + '%' }} />
            <p className="text-clr-light font-size-md" style={{ marginTop: 0 }}>Page Not Found</p>
            <LinkButton href="/" internal>
                Go back home
            </LinkButton>
        </div>

    </>
}