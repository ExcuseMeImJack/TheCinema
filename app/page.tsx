import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            alt='Film Background Image'
            src='https://i.imgur.com/W2oTx5H.jpg'
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
