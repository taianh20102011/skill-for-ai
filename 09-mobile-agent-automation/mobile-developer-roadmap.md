# MOBILE DEVELOPER ROADMAP & KNOWLEDGE HUB

## 1. Modern Android Native Development (Kotlin)
Tham chiếu chi tiết: `D:\SKILL_AI\09-mobile-agent-automation\roadmaps-and-awesome\android-developer-roadmap`
- **Declarative UI**: Jetpack Compose (Layouts, Modifiers, State hoisting, Side-effects: `LaunchedEffect`, `rememberCoroutineScope`).
- **Asynchronous & Reactive**: Kotlin Coroutines (`viewModelScope`), StateFlow, SharedFlow.
- **Architecture**: MVVM / MVI với Unidirectional Data Flow (UDF).
- **Dependency Injection**: Hilt / Koin.
- **Persistence & Networking**: Room DB, DataStore, Retrofit / Ktor Client, Moshi / KotlinX Serialization.
- **Background Tasks**: WorkManager.

## 2. Modern iOS Native Development (Swift)
Tham chiếu kho thư viện & modules: `D:\SKILL_AI\09-mobile-agent-automation\roadmaps-and-awesome\awesome-ios`
- **Declarative UI**: SwiftUI (View hierarchies, State management: `@State`, `@Binding`, `@Observable`, `@StateObject`).
- **Concurrency**: Modern Swift Concurrency (`async/await`, `Task`, `Actors`, structured concurrency).
- **Architecture**: MVVM, TCA (The Composable Architecture), Clean Architecture.
- **Persistence & Networking**: SwiftData, CoreData, URLSession, Alamofire.
- **Animations & Graphics**: CoreAnimation, Metal shaders, SwiftUI spring physics.

## 3. Cross-Platform Engineering (Flutter & React Native)
### A. Flutter (Dart)
Tham chiếu toàn diện: `D:\SKILL_AI\09-mobile-agent-automation\cross-platform\awesome-flutter`
- **Single Codebase**: Một mã nguồn duy nhất biên dịch AOT Native ra ARM code cho iOS & Android (và CanvasKit/Wasm cho Web).
- **State Management**: BLoC pattern (Event-State streams), Riverpod (Compile-safe dependency injection), Provider.
- **Rendering Pipeline**: Widget Tree -> Element Tree -> RenderObject Tree; cơ chế Impeller rendering engine (triệt tiêu shader compilation jank).
- **Routing & Deep Linking**: GoRouter với declarative route guards.

### B. React Native (TypeScript / JavaScript)
Tham chiếu toàn diện: `D:\SKILL_AI\09-mobile-agent-automation\cross-platform\awesome-react-native`
- **New Architecture**: JavaScript Interface (JSI), Fabric Renderer (đồng bộ hóa render trực tiếp với C++ native), TurboModules.
- **Styling & Physics**: NativeWind (Tailwind CSS cho React Native), React Native Reanimated v3 (chạy 60fps trên UI thread), Gesture Handler.
- **Frameworks & Tooling**: Expo (EAS Build, File-based routing qua Expo Router).
- **State & Data**: Zustand, TanStack Query, WatermelonDB (SQLite offline-first).
