const PopoverContent = () => {
  const PopoverItemStyle =
    'py-4 px-8 border border-gray-400/70 rounded cursor-pointer hover:text-blue-700 transition-all';

  return (
    <div className='w-400 rounded bg-white px-24 pb-20 pt-16'>
      <h3 className='mb-8 text-lg font-extrabold'>검색</h3>
      <div className='flex flex-wrap gap-8'>
        <a href='/people' className={PopoverItemStyle}>
          유형1
        </a>
        <a className={PopoverItemStyle} href='/companies'>
          유형2
        </a>
        <a className={PopoverItemStyle} href='/jobs'>
          유형3
        </a>
      </div>
    </div>
  );
};

export default PopoverContent;