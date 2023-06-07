import type { Dispatch, SetStateAction } from 'react';

import ICONS from '../icons';
import SVGS from '../svgs';

interface SidebarContentProps {
  setSidebarShow: Dispatch<SetStateAction<boolean>>;
}

const SidebarContent = ({ setSidebarShow }: SidebarContentProps) => {
  const LinkItem = ({ url, content }: any) => {
    return (
      <li className='cursor-pointer px-24 py-12 text-center hover:bg-gray-100'>
        <a href={url}>{content}</a>
      </li>
    );
  };

  return (
    <nav className='h-full w-240 bg-white'>
      <div className='mb-24 flex items-center justify-between px-24 pt-16'>
        <div className='cursor-pointer' onClick={() => setSidebarShow(false)}>
          <ICONS.Close className='text-[32px]' />
        </div>
        <div className='h-32 w-32 flex-center'>
          <SVGS.Google />
        </div>
      </div>
      <ul>
        <LinkItem url='/' content='홈' />
        <LinkItem url='/people' content='사람' />
        <LinkItem url='/companies' content='기업' />
        <LinkItem url='job' content='채용' />
      </ul>
    </nav>
  );
};

export default SidebarContent;