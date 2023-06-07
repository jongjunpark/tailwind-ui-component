import ICONS from '../icons';

export const DropdownItems = [
  [
    {
      label: 'Edit',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <ICONS.Edit />
        </div>
      ),
      url: '/test',
    },
    {
      label: 'Duplicate',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <ICONS.Duplicate />
        </div>
      ),
    },
  ],
  [
    {
      label: 'Archive',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <ICONS.Archive />
        </div>
      ),
    },
    {
      label: 'Move',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <ICONS.Move />
        </div>
      ),
    },
  ],
  [
    {
      label: 'Delete',
      icon: (
        <div className='mr-8 h-20 w-20'>
          <ICONS.Delete />
        </div>
      ),
    },
  ],
];
