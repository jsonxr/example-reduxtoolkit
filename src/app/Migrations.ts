import { createMigrate } from 'redux-persist'

const getMax = (a: number, b: number) => Math.max(a, b)

export const createMigrations = (
  migrations: Record<number, (state: any) => any>,
  { debug = false }: { debug?: boolean } = {}
) => {
  const version = Object.keys(migrations)
    .map((k) => Number(k))
    .reduce(getMax)

  return {
    version,
    migrations: createMigrate(migrations, { debug }),
  }
}
