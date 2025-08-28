import Image from 'next/image'

export default function Logo({
  size = 32,
  withText = false,
}: {
  size?: number
  withText?: boolean
}) {
  return (
    <div className="logo-wrap">
      <Image
        src="/logo.png"
        alt="FleteAhora"
        width={size}
        height={size}
        priority
        className="rounded-md"
      />
      {withText && <span className="logo-title">FleteAhora</span>}
    </div>
  )
}
