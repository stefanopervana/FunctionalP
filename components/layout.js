import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |<br></br>
        <Link href='/intro'><a>Introducción</a></Link> |<br></br>
        <Link href='/Ch1'><a>Chapter1</a></Link> |<br></br>
        <Link href='/Ch2'><a>Apppppp</a></Link> |<br></br>
        <Link href='/Ch3'><a>Chapter3</a></Link> |<br></br>
        <Link href='/Ch4'><a>Chapter4</a></Link> |<br></br>
        <Link href='/Ch5'><a>Chapter5</a></Link> |<br></br>
        <Link href='/Ch6'><a>Chapter6</a></Link> |<br></br>
        <Link href='/Ch7'><a>Chapter7</a></Link> |<br></br>
        <Link href='/Ch8'><a>Chapter8</a></Link> |<br></br>
        <Link href='/Ch9'><a>Chapter9</a></Link> |<br></br>
        <Link href='/Anexo'><a>Anexo</a></Link>
      </nav>
    </header>

    {  children }

    <footer>
      I`m here to stay
    </footer>
  </div>
)
