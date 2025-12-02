export default function Date({ fixedDate }: {fixedDate: string }) {
    return (
        <time className='font-semibold'>
           Date: {fixedDate}
        </time>
    )
}