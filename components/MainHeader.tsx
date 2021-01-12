import Image from 'next/image';

export default function MainHeader() {
    return (
        <header>
            <Image src="/images/logo_bdi475.svg"
            alt="Tabbied"
            layout="fixed"
            width={124}
            height={39}
             />
        </header>
    );
}