import React from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import clsx from "clsx";
import authAtom from "atoms/auth";
import layoutAtom from "atoms/layout";
import { useRecoilValue, useRecoilState } from "recoil";
import navList from "./navList";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";

const AdminLayout: React.FC<any> = ({ children, title }) => {

  const authState = useRecoilValue(authAtom);
  const [layoutState, setLayoutState] = useRecoilState(layoutAtom);

  const toggleMobileMenu = () => {
    setLayoutState({
      ...layoutState,
      isMobile: !layoutState.isMobile
    })
  }

  return (
    <div className={clsx('flex h-screen bg-grey4 transition-transform lg:transition-none transform', { 'translate-x-80': layoutState.isMobile })}>

      {/* sidebar */}
      <aside className="z-20 w-80 h-full overflow-y-auto bg-white shadow flex-shrink-0 absolute -left-80 lg:relative lg:left-0">
        <div className="py-4">

          <div className="flex justify-center py-4">
            <img className="h-16" src="/logo-black.png" alt="" />
          </div>

          <div className="space-y-1 text-center">

            <div className="text-xl text-dark1">
              {authState.user?.name}
            </div>
            <div className="text-sm text-grey1">
              {authState.user?.email}
            </div>
          </div>

          <ul className="p-6">
            {navList.map(nav =>
              <NavLink key={nav.path} data={nav} />
            )}
          </ul>

        </div>
      </aside>

      <div className="flex flex-col flex-1 w-full">

        <header className="z-10 h-16 bg-white shadow1">
          <div className="flex items-center h-full p-8">
            <button className="btnOutline lg:hidden" onClick={toggleMobileMenu}>
              <AiOutlineMenu />
            </button>
            <div className="text-2xl text-dark1 font-semibold pl-4 lg:pl-0">
              {title}
            </div>
            <div className="flex-grow"></div>
            <UserMenu />
          </div>
        </header>

        <main className="h-full overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;