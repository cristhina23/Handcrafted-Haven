import Link from 'next/link';

export default function Nav() {
    return (
        <div className="grid grid-cols-3 sm-grid-cols-3 justify-center gap-8">
            <div>
                <h3 className="font-semibold mb-4">Shop</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="#">New Arrivals</Link></li>
                <li><Link href="#">Best Sellers</Link></li>
                <li><Link href="#">Jewelry</Link></li>
                <li><Link href="#">Home Décor </Link></li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold mb-4">About</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="#">Our Story</Link></li>
                <li><Link href="#">Meet the Makers</Link></li>
                <li><Link href="#">Sustainability</Link></li>
                <li><Link href="#">Blog</Link></li>
                </ul>
            </div>

            <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="#">Contact Us</Link></li>
                <li><Link href="#">FAQs</Link></li>
                <li><Link href="#">Shipping & Returns</Link></li>
                <li><Link href="#">Privacy Policy</Link></li>
                </ul>
            </div>

        </div>
    )
}