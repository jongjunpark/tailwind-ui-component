import type { ElementType, ReactNode } from 'react';

import { Disclosure as HeadlessDisclosure } from '@headlessui/react';

import Transition from './Transition';

interface TransitionType {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

interface DisclosureProps {
  items: { heading: ReactNode; content: ReactNode }[];
  wrapStyle?: string;
  disclosureProps?: { as?: ElementType; defaultOpen?: boolean };
  panelProps?: {
    as?: ElementType;
    static?: boolean;
    unmount?: undefined;
  };
  transitionProps?: TransitionType;
  isReverse?: boolean;
}

const transitionPropsDefault = {
  enter: 'transition-all ease-in-out duration-300',
  enterFrom: 'max-h-0 opacity-0',
  enterTo: 'max-h-1000 opacity-100',
  leave: 'transition-all ease-in-out duration-300 overflow-hidden',
  leaveFrom: 'max-h-1000 opacity-100',
  leaveTo: 'max-h-0 opacity-0',
};

const Disclosure = ({
  items,
  wrapStyle,
  disclosureProps,
  panelProps,
  transitionProps = transitionPropsDefault,
  isReverse,
}: DisclosureProps) => {
  if (!items) return null;

  return (
    <div className={wrapStyle ?? ''}>
      {items.map((item, idx) => {
        return (
          <HeadlessDisclosure key={idx} {...disclosureProps}>
            {({ open }) => (
              <div>
                {isReverse ? (
                  <>
                    <Transition show={open} {...transitionProps}>
                      <HeadlessDisclosure.Panel static {...panelProps}>
                        {item.content}
                      </HeadlessDisclosure.Panel>
                    </Transition>
                    <HeadlessDisclosure.Button
                      as='div'
                      className={open ? '[&_svg]:rotate-180' : ''}
                    >
                      {item.heading}
                    </HeadlessDisclosure.Button>
                  </>
                ) : (
                  <>
                    <HeadlessDisclosure.Button
                      as='div'
                      className={open ? '[&_svg]:rotate-180' : ''}
                    >
                      {item.heading}
                    </HeadlessDisclosure.Button>
                    <Transition show={open} {...transitionProps}>
                      <HeadlessDisclosure.Panel static {...panelProps}>
                        {item.content}
                      </HeadlessDisclosure.Panel>
                    </Transition>
                  </>
                )}
              </div>
            )}
          </HeadlessDisclosure>
        );
      })}
    </div>
  );
};

export default Disclosure