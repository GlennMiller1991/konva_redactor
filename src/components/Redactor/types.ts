export type tDrawingObject = any

export type FreehandScheduleDto = {
    id: number, // ID в БД. -1 для новых объектов.
    name: string, // Наименование графика
    description: string, // Описание
    trackId: number, // ID учаска, для которого строится график
    trackName: string, // наименование участка
    oddDirectionFromFirstStation: Boolean, // Флаг четности/нечетности. Если true, направление увеличения координат считается нечетным.
    singleTrackSchedules: FreehandSingleTrackScheduleDto[], // Графики движения для отдельных путей. Массив отсортирован по номеру пути.
    computationBoundaries: PairOfNumbers, // ВременнЫе границы (в минутах) для расчета пропускной способности. Для новых графиков они равны {first: 0, second: 0}.
                                          // Ограничения:
                                          //    1) 0 <= first <= 1440, first <= second <= 1440
                                          //    2) second - first <= 120
    locomotiveCurrent: LocomotiveCurrent, // Тип тока
    changeTime: string // Дата и время последнего изменения
}

type FreehandScheduleShortDto = {
    id: number,
    name: string,
    description: string,
    trackId: number,
    trackName: string,
    locomotiveCurrent: LocomotiveCurrent,
    changeTime: string
}

type PairOfNumbers = { first: number, second: number }
type LocomotiveCurrent = "DIRECT_CURRENT" | "ALTERNATING_CURRENT"

/** Данные графика движения по одному пути */
export type FreehandSingleTrackScheduleDto = {
    trackNumber: number, // Номер пути
    stations: StationDto[], // Массив станций, доступных на данном пути
    routes: FreehandRouteDto[], // Массив "ниток" графика движения
    prototypeRoutes: FreehandRouteDto[] // Массив прототипов для "ниток"
}

export type StationDto = {
    id: number,
    name: string,
    coordinate: number,
    loopStation: boolean
}

/** "Нитка" графика */
type FreehandRouteDto = {
    tractiveCalculationId: number, // ID результатов тягового расчета в БД
    spans: SpanDto[], // Массив с данными перегонов
    mass: number, // масса поезда
    categoryDto: TrackCategoryDto, // Категория нитки
    tcDescription?: string // Описание тягового расчета. Например: "6 путей_тест (0.075 мин, 1034 т, чет)". Для объектов из массива FreehandSingleTrackScheduleDto.routes всегда undefined.
    avgPeriod?: number // Период усреднения тягового расчета. Для объектов из массива FreehandSingleTrackScheduleDto.routes всегда undefined.
}

/** Перегон - звено "нитки" - перегон между соседними станциями, а также стоянка на станции. */
type SpanDto = {
    tp?: "h" | undefined, // Тип "перегона". "h" - Halt - стоянка, undefined - Span - перегон между станциями.
    a: number, // anchor - временная координата начальной точки
    t: Boolean, // transparent - признак "прозрачности". Сквозь "прозрачные" перегоны (например через стоянку на станции с путевым развитием) можно пропускать другие нитки. Используется при валидации графика.
    points?: number // Массив точек для отрисовки линии перегона. Формат, как в Konva: [t0, x0, t1, x1, t2, x2, ...]
}

type TrackCategoryDto = {
    id: number,
    name: string,
    priority: number
}

type PagedResult<T> = {
    entities: T[],
    totalCount: number,
    totalPages: number
}

/**
 * API
 *
 * =======================================================================================
 * Получить список всех сохраненных графиков
 * URL: $BASE_API_V1/motion-schedule
 * Метод: GET
 * Параметры запроса:
 *  - page: number - индекс страницы, индексация с 0
 *  - size: number - количество элементов на странице
 *  - sortBy: string[], defaultValue = ["name", "changeTime"] - имена полей для сортировки
 *  - sortDirection: "ASC" | "DESC", defaultValue = "ASC" - направление сортировки
 * Ответ: PagedResult<FreehandScheduleShortDto>
 * =======================================================================================
 * =======================================================================================
 * Получить список всех графиков, сохраненных авторизованным пользователем
 *
 * URL: $BASE_API_V1/motion-schedule/onlyMine
 * Метод: GET
 * Параметры запроса:
 *  - page: number - индекс страницы, индексация с 0
 *  - size: number - количество элементов на странице
 *  - sortBy: string[], defaultValue = ["name", "changeTime"] - имена полей для сортировки
 *  - sortDirection: "ASC" | "DESC", defaultValue = "ASC" - направление сортировки
 * Ответ: PagedResult<FreehandScheduleShortDto>
 * =======================================================================================
 * =======================================================================================
 * Получить данные графика по ID
 * URL: $BASE_API_V1/motion-schedule/{id}
 * Метод: GET
 * Ответ: FreehandScheduleDto
 * =======================================================================================
 * =======================================================================================
 * Сохранить график
 * URL: $BASE_API_V1/motion-schedule/save
 * Метод: POST
 * В теле запроса: FreehandScheduleDto
 * Ответ: FreehandScheduleDto
 * =======================================================================================
 * =======================================================================================
 * Удалить график
 * URL: $BASE_API_V1/motion-schedule
 * Метод: DELETE
 * Параметры запроса:
 *  - id - ID в базе данных
 *  - page: number - индекс страницы, индексация с 0
 *  - size: number - количество элементов на странице
 *  - sortBy: string[], defaultValue = ["name", "changeTime"] - имена полей для сортировки
 *  - sortDirection: "ASC" | "DESC", defaultValue = "ASC" - направление сортировки
 * Ответ: PagedResult<FreehandScheduleShortDto>
 * =======================================================================================
 * =======================================================================================
 * Расчет параллельного графика
 * URL: $BASE_API_V1/motion-schedule/parallel
 * Метод: POST
 * Параметр запроса: schemaId: number - ID электрической схемы
 * В теле запроса: FreehandScheduleDto
 * Ответ: FreehandScheduleDto
 * =======================================================================================
 */