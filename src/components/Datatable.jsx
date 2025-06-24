import DataTable from 'react-data-table-component'
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/id'

moment.locale('id')

function Datatable({ data, isCent }) {
    const columns = [
        {
            name: 'Pair',
            selector: (row) => row.symbol,
            sortable: true,
            format: (row) => row.symbol.replace(/[^A-Z]/g, ''),
        },
        {
            name: 'Lot',
            selector: (row) => row.lots,
            sortable: true,
        },
        {
            name: 'Profit',
            selector: (row) =>
                Object.entries(row).find(([key]) =>
                    key.includes('profit_us')
                )?.[1],
            sortable: true,
            format: (row) => {
                let value = Object.entries(row).find(([key]) =>
                    key.includes('profit_us')
                )?.[1]
                if (isCent) {
                    value /= 100
                }
                return '$' + Number(value).toFixed(2)
            },
            conditionalCellStyles: [
                {
                    when: (row) =>
                        Object.entries(row).find(([key]) =>
                            key.includes('profit_us')
                        )?.[1] >= 0,
                    style: {
                        color: 'rgba(63, 195, 128, 0.9)',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
                {
                    when: (row) =>
                        Object.entries(row).find(([key]) =>
                            key.includes('profit_us')
                        )?.[1] < 0,
                    style: {
                        color: 'rgba(242, 38, 19, 0.9)',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ],
        },
        {
            name: 'Komisi',
            selector: (row) =>
                Object.entries(row).find(([key]) =>
                    key.includes('commission_us')
                )?.[1],
            sortable: true,
            format: (row) => {
                let value = Object.entries(row).find(([key]) =>
                    key.includes('commission_us')
                )?.[1]
                if (isCent) {
                    value /= 100
                }
                return '$' + Number(value).toFixed(2)
            },
        },
        {
            name: 'Swap',
            selector: (row) =>
                Object.entries(row).find(([key]) =>
                    key.includes('swap_us')
                )?.[1],
            sortable: true,
            format: (row) => {
                let value = Object.entries(row).find(([key]) =>
                    key.includes('swap_us')
                )?.[1]
                if (isCent) {
                    value /= 100
                }
                return '$' + Number(value).toFixed(2)
            },
        },
        {
            name: 'Tipe',
            selector: (row) => row.type,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: (row) => row.type == 'buy',
                    style: {
                        color: 'rgba(63, 195, 128, 0.9)',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
                {
                    when: (row) => row.type == 'sell',
                    style: {
                        color: 'rgba(242, 38, 19, 0.9)',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ],
        },
        {
            name: 'TP',
            selector: (row) => row.take_profit,
            format: (row) => row.take_profit || '-',
        },
        {
            name: 'SL',
            selector: (row) => row.stop_loss,
            format: (row) => row.stop_loss || '-',
        },
        {
            name: 'Diutup Oleh',
            selector: (row) => row.close_reason,
            format: (row) =>
                row.close_reason != 'user'
                    ? row.close_reason.toUpperCase()
                    : row.close_reason,
        },
        {
            name: 'Open Order',
            width:'200px',
            center: 'true',
            selector: (row) => row.opening_time_utc,
            format: (row) => {
                let opening_time = row.opening_time_utc

                const formatted_opening = moment(opening_time)
                .utcOffset(7 * 60) // GMT+7 dalam menit
                .format('DD-MMMM-YYYY HH:mm:ss')
                .toLowerCase()

                return formatted_opening
            }
        },
        {
            name: 'Close Order',
            width:'200px',
            center: 'true',
            selector: (row) => row.closing_time_utc,
            format: (row) => {
                let closing_time = row.closing_time_utc
                const formatted_closing = moment(closing_time)
                .utcOffset(7 * 60) // GMT+7 dalam menit
                .format('DD-MMMM-YYYY HH:mm:ss')
                .toLowerCase()

                return formatted_closing
            }
        },
    ]

    return (
        <div className="p-10 w-full h-auto overflow-x-auto bg-white/50 border border-gray-200 rounded-lg shadow-sm align-center justify-center gap-10">
            <DataTable columns={columns} data={data} pagination />
        </div>
    )
}

export default Datatable
