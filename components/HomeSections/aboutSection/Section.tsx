import CustomerReview from "./testimony";
import OurMission from "./Mission";

export default function Impression() {
    return (
        <div className="grid sm:grid-cols md:grid-cols-2">
            <CustomerReview />
            <OurMission/>
        </div>
    )
}