- node -v to check node version
- vs code + extensions ( prettier, ES7 code snippets, React dev tools )
- CRA / Vite npm create vite@latest / npm create vite@4.1.0
- Component can have ts or tsx as extensions
- we use functional components , JSX, evaluating expression, VDOM,
- Fragment, conditional rendering, ternary, ampersand. Handling events. SyntheticBaseEvent. ( React.MouseEvent )
- useState
- interface Props { items: string[], onSelect: (item: string) => void }
- state vs prop, pass functions as props
- pass children as props, ReactNode to type children.
- Styling: vanilla css: add a css, and import it within components.
- CSS modules: scoped. use the something.module.css syntax and use it as
  import styles from './something.module.css'

- CSS in JS are scoped, all CSS, TS , JS code in one place.
- easier to delete. Style a component based on props / state ( styled components emotion etc )
- npm i @types/styled-components
- seperation of concerns, inline styles,
- npm i react-icons
- Component state -
- state is updated asynchronously,
- state is stored outside of component
- hooks can be used at the top level of components
- avoid redundant state variables, group related variables inside object, avoid deeply nested structure
- pure function & components
- strict mode: no visual presentation, catch impure components & issues. Each component is rendered twice & takes result of second render.
- strict mode logs are greyed out , only in dev mode.
- nested objects need to be recursively copied.
- immer ( npm i immer )
- import produce from 'immer'

```
  setName(produce(draft => {
    const bug = draft.find(bug => bug.id === 1)
    if(bug) {
      bug.fixed = true;
    }
  }))
```

- Share state between components - state lifting, prop drilling
- component that holds the state is responsible for updating it.
- building forms: react hook forms
- onSubmit - event.preventDefault() event: React.FormEvent
- useRef can be used to reference DOM element.
  const nameRef = useRef<HTMLInputElement>(null);
  <input ref={nameRef} />
- we can also use the state hook to make the component a controlled component

- npm i react-hook-form

```



import { useForm } from 'react-hook-form'
const { register, handleSubmit, formState: { errors } }= useForm<FormData>();

const onSubmit = (data: FieldValues) => {}

interface FormData {
  name: string;
  age: number
}

<form onSubmit={handleSubmit(onSubmit)}

<input {...register('name', { required: true, minLength: 3 })}/>
{errors.name?.type === 'required' && <p className="red"> Name is required </p>}
{errors.name?.type === 'minLength' && <p className="red"> Name needs 3 chars </p>}
<input {...register('age')}/>
```

Zod for schema based validation

- Joi, Yup, Zod

- npm i zod
  npm i @hookform/resolvers@2.9.11

```
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import category from './category';

const schema = z.object({
  name: z.string().min(3, { message: 'Name must be atleast 3 characters'}),
  age: z.number({ invalid_type_error: 'Age field is required'}).min(18, { message: 'Age must be atleast 18'}),
  categories: z.enum(categories, {
    errorMap: () => ({ message: 'Category is required'})
  })
})

type FormData = z.infer<typeof schema>

const { register, handleSubmit, reset, formState: { errors, isValid } }= useForm<FormData>({ resolver: zodResolver(schema)});

const onSubmit = () => {
  reset();
}

<form onSubmit={handleSubmit(onSubmit)}

<input {...register('name')}/>
{errors.name && <p className="red"> {errors.name.message} </p>}
<input {...register('age', { valueAsNumber: true})}/>
{errors.age && <p className="red"> {errors.age.message} </p>}
<button disabled={!isValid}> submit </button>

```

to make a readonly array, export const categories = [] as const;

Backend:

- keep changes outside the render phase.
- for side effects, store data in local storage, call server, manually modify the DOM
- effect hook - execute a piece of code after the component is rendered.
- call only at top level
- effect dependencies, 3 options - every time, only once, only when the dependency changes

```
const ref = useRef<HTMLInputElement>(null)
useEffect(() => {
  if(ref.current) {
    ref.current.focus();
  }
  return () => {
    // clean up
  }
})

return (
  <input ref={ref}/>
)
```

```
useEffect(() => {
  const controller = new AbortController()
  axios.get('url', { signal: controller.signal }).then(data => setData(data))
  .catch(err => {
    if(err instanceof CanceledError) return;
    setError(err.message)
  }).finally(() => {

  })

  return () => controller.abort();
}, [])

or else with async await

try {

}
catch(err) {
  setError((err as AxiosError).message)
}
```

deleting - optimistic / pessimistic update
