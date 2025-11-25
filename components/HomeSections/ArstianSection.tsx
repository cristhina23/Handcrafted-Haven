import { CarouselSpacing } from './carousel'
import ViewAll from './ViewButton'


export default function MeetOurMakers() {
    return (
        <section className="w-full grid bg-(--brand-light-gray)">
            <div className="w-full py-15 px-5 ">
                <div className="max-w-7x1 mx-5 mt-3 flex justify-between  ">
                    <h2 className="text-2xl font-bold text-(--branding-dark)">Meet Our Makers</h2>
                    <ViewAll/>
                </div>
                <CarouselSpacing/>
            </div>
        </section>
    )
}