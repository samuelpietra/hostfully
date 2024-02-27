import { FaGithub } from 'react-icons/fa'

import { IconButton } from '@mui/material'

import fullLogo from '@/assets/full-logo.svg'

import * as S from './TopBar.styles'

function TopBar() {
  return (
    <S.TopBar>
      <img src={fullLogo} alt="logo" height={45} />

      <IconButton
        style={{ padding: 0 }}
        onClick={() => window.open('https://github.com/samuelpietra/hostfully', '_blank')}
      >
        <FaGithub size={32} />
      </IconButton>
    </S.TopBar>
  )
}

export { TopBar }
