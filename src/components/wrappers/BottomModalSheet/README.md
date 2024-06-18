# Модальное окно выежаюшее с низу экрана.


<img src="https://drive.google.com/thumbnail?id=1c8S2TXnvvGzyg-RukRfZMfz9suCn2pTx">

## Использование доступных методов :

```typescript
import { FC, useState, useRef } from 'react';
import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';

const bottomSheetRef = useRef<IRefBottomModalSheet>(null);

// Открытие модального окна.
const openList = () => bottomSheetRef.current?.openModal();
// Закрытие модального окна.
const closeList = () => bottomSheetRef.current?.closeModal();

return (
    <BottomModalSheet ref={bottomSheetRef} >
        {children}
    </BottomModalSheet>
)
```

