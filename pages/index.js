import Image from 'next/image';
import { Logo } from '../components/logo';
import Link from 'next/link';

function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src="/blog.jpg" alt="logo" fill className="absolute" />
      <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <Logo />
          <p>
            Blogify's intelligent suggestions will ignite your creativity, helping you craft captivating content that
            stands out from the crowd. Say goodbye to mundane and repetitive blog posts!
          </p>
          <br />
          <Link href="/post/new" className="btn">
            Begin your journey
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
