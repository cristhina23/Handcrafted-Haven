import Logo from './FooterLogo'
import Nav from './FooterNav'
import FooterNewsletter from './FooterNewspaper';
import FooterBottom from "./FooterBottom";


export default function Footer() {
    return (
    <footer className="w-full bg-(--brand-dark) text-(--brand-light) py-16 font-merriweather">
        <div className="max-w-7xl mx-auto px-6 grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center gap-12 ">
            <Logo/>
            <Nav />
            <FooterNewsletter/>
        </div>
        <FooterBottom/>
    </footer>
    )
}