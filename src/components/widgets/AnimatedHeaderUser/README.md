# AnimatedHeaderUser 


```typescript
// Импорт компанента.
import AnimatedHeaderUser, {IAnimatedHeaderUserRef} from '@/components/widgets/AnimatedHeaderUser/AnimatedHeaderUser';

// Создание Ref.
const someRef = useRef<IAnimatedHeaderUserRef>(null);


<AnimatedHeaderUser 
    title={#} // Заголовок.
    subtitle={#} // Под заголовок. 
    picture={picture} // Изображение.
    ref={someRef} // Ref.
/>

// Подключение, для отслеживания скролла.
<FlatList
    onScroll={someRef.current?.handleScroll}
/>
```