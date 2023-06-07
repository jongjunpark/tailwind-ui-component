const PopoverContent = () => {
  const PopoverItemStyle =
    'py-4 px-8 border border-gray-400/70 rounded cursor-pointer hover:text-blue-700 transition-all';

  return (
    <div className='w-400 rounded bg-white px-24 pb-20 pt-16'>
      <h3 className='mb-8 text-lg font-extrabold'>카테고리별 검색</h3>
      <div className='flex flex-wrap gap-8'>
        <a href='/people' className={PopoverItemStyle}>
          사람
        </a>
        <a className={PopoverItemStyle} href='/companies'>
          기업
        </a>
        <a className={PopoverItemStyle} href='/jobs'>
          채용
        </a>
      </div>
    </div>
  );
};

export default PopoverContent;