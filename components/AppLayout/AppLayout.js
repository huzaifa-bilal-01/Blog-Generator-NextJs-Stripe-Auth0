import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCoins, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../logo";

export const AppLayout = ({ children, availableTokens, posts, postId }) => {
  const { user } = useUser();
  const [showSidebar, setShowSidebar] = useState(true); // State variable for sidebar visibility
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as per your needs
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      {showSidebar && (
        <div className="flex flex-col text-white overflow-hidden">
          <div className="bg-purple-900 px-2">
            <Logo />
            <Link href="/post/new" className="btn">
              New post
            </Link>

            <Link href="/token-topup" className="block mt-2 text-center">
              <FontAwesomeIcon icon={faCoins} className="text-yellow-400" />
              <span className="pl-1">{availableTokens} tokens available</span>
            </Link>

          </div>
          <div className="px-4 flex-1 overflow-auto bg-gradient-to-b from-purple-900 to-indigo-900">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/post/${post._id}`}
                className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${postId === post._id ? "bg-white/20 border-white" : ""
                  }`}
              >
                {post.topic}
              </Link>
            ))}
          </div>
          <div className="bg-indigo-900 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
            {!!user ? (
              <>
                <div className="min-w-[50px]">
                  <Image
                    src={user.picture}
                    alt={user.name}
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold">{user.email}</div>
                  <Link className="text-sm" href="/api/auth/logout">
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <Link href="/api/auth/login">Login</Link>
            )}
          </div>
        </div>
      )}
      {isMobile && (
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} className="fixed top-5 right-5 text-4xl text-indigo-500 " /> 
      )}

      {children}
    </div>
  );
};
