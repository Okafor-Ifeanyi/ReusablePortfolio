import type { ComponentType } from 'react'
import type { PortfolioData } from './queries/portfolio'

import BioTheme from '@/themes/bio'
import LotaTheme from '@/themes/lota'

export type ThemeProps = { portfolio?: PortfolioData }

export const THEME_REGISTRY: Record<string, ComponentType<ThemeProps>> = {
  bio: BioTheme,
  lota: LotaTheme,
}
