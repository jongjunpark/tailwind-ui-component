import SVGS from '../svgs';

export const DropdownItems = [
  [
    {
      label: 'Edit',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <SVGS.Edit />
        </div>
      ),
      url: '/test',
    },
    {
      label: 'Duplicate',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <SVGS.Duplicate />
        </div>
      ),
    },
  ],
  [
    {
      label: 'Archive',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <SVGS.Archive />
        </div>
      ),
    },
    {
      label: 'Move',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <SVGS.Move />
        </div>
      ),
    },
  ],
  [
    {
      label: 'Delete',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <SVGS.Delete />
        </div>
      ),
    },
  ],
];
