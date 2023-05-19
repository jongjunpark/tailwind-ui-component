import type {
  ReactNode,
  JSXElementConstructor,
  ComponentClass,
  ComponentProps,
  FC,
} from 'react'

import type { TransitionEvents, TransitionClasses } from '@headlessui/react'
import { Transition as HeadlessUiTransition } from '@headlessui/react'

type BaseProps = TransitionEvents &
  TransitionClasses & {
    as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>
    children: ReactNode
    unmount?: boolean
  }
type RootClassType = ComponentClass<(typeof HeadlessUiTransition)['Root']>
type RootProps = Omit<ComponentProps<RootClassType>, 'displayName'> &
  BaseProps & {
    show?: boolean
    appear?: boolean
  }
type RootType = FC<RootProps>
type ChildClassType = ComponentClass<(typeof HeadlessUiTransition)['Child']>
type ChildProps = Omit<ComponentProps<ChildClassType>, 'displayName'> &
  BaseProps & {
    appear?: boolean
  }
type ChildType = FC<ChildProps>
const TransitionRoot: RootType = props => {
  return <HeadlessUiTransition.Root {...props} className="relative z-popover" />
}

const TransitionChild: ChildType = props => {
  return <HeadlessUiTransition.Child {...props} />
}

const Transition = Object.assign(TransitionRoot, {
  Root: TransitionRoot,
  Child: TransitionChild,
})

export default Transition
