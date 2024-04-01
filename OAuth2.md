# Ссылка на видео туториал
`https://www.youtube.com/watch?v=BDeKTPQzvR4`

## Установка пакетов
`npx expo install expo-auth-session expo-crypto expo-web-browser react-dom @expo/webpack-config @react-native-async-storage/async-storage`

## Создать проект в Google Cloud
`https://console.cloud.google.com/`

- Cоздаем в созданном проекте идентификатор OAuth2, для каждой платформы свой: android, ios, web.\
1 - Go in `APIs & Services`\
2 - Go in `Enable APIs & services`\
3 - Go in `Credentials`\
4 - Go in `CREATE CREDENTIALS`\
5 - Настройка экрана согласия, настраиваем экран который увидит пользователь при входе через Google, это информация о приложении, информация о разработчике и о том какую информацию мы получаем от пользователя.
5 - Tab `Configure consent screen`\
6 - Tab `External`\
7 - Заполняем: название приложения, почта для поддержки пользователей и почта разработчика(в самом низу), остальное по необходимости.
8 - Далее постоянно: сохранее и продолжаем далее.
9 - Go in `Credentials`
10 - Go in `CREATE CREDENTIALS`\ 
11 - Go in `Create OAuth client ID`
12 - Выбираем платформу для которой создаем идентификатор.
npx expo prebuild

test



