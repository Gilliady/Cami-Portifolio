import type { Schema, Struct } from '@strapi/strapi';

export interface PortfolioStat extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_stats';
  info: {
    description: 'Counter stat item';
    displayName: 'Stat';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'portfolio.stat': PortfolioStat;
    }
  }
}
