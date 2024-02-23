import { FaGithub } from 'react-icons/fa'

import fullLogo from '@/assets/full-logo.svg'

import * as S from './TopBar.styles'

function TopBar() {
  return (
    <S.TopBar>
      <img src={fullLogo} alt="logo" height={45} />

      <a href="https://github.com/samuelpietra/hostfully" target="_blank">
        <FaGithub aria-label="FaGithub" size={32} />
      </a>
    </S.TopBar>
  )
}

export { TopBar }
