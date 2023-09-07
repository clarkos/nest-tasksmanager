import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const serviceCfg = new ConfigService();

export const DatasourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: serviceCfg.get('DB_HOST'),
  port: serviceCfg.get('DB_PORT'),
  username: serviceCfg.get('DB_USER'),
  password: serviceCfg.get('DB_PASS'),
  database: serviceCfg.get('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + './../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DatasourceConfig);
