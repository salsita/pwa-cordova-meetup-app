import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: true,
  pwa: true,
  applicationServerPublicKey: 'BOkeCBZyEnydoii6PEwGyt1v-i-P7xyiLDfqoYqCEwQgSb9sT3OJ1WwgkIDO1eBr24y9v-viSNOJnBQIEmNPuvk',
  providers: [StoreDevtoolsModule.instrument({
    maxAge: 25,
  })],
};
