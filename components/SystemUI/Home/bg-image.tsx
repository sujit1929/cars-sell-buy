
import Image from "next/image";

export default function F() {
    return (
        <div className="w-[70vw] mx-auto h-120 rounded-lg mt-4">
            <Image
                src="/front-left-side-47.avif"
                alt="Car front left side"
                className="w-full h-120 rounded-lg object-cover object-center"
                width={1200}
                height={600}
                priority
            />
        </div>
    );
}

