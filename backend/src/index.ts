import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // 1. Automatically enable Public permissions for Project and General-Info
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const actions = [
          'api::project.project.find',
          'api::project.project.findOne',
          'api::general-info.general-info.find',
        ];

        for (const action of actions) {
          const existing = await strapi.query('plugin::users-permissions.permission').findOne({
            where: { role: publicRole.id, action },
          });

          if (!existing) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id,
              },
            });
          }
        }
      }

      // 2. Seed initial projects if table is empty
      const projectCount = await (strapi.documents('api::project.project') as any).count({});
      if (projectCount === 0) {
        const initialProjects = [
          {
            title: 'Red Pistol - Animated Short',
            category: '2D Animation & Art Direction',
            description: 'Art direction, concept art and cinematic storyboard for stylized action short animation.',
            order: 1,
            hasPlay: true,
            hasAwards: false,
            cols: 'col-span-6',
          },
          {
            title: 'Lumisense - Industrial Logistics',
            category: 'Corporate Film & Production',
            description: 'High-impact corporate cinematography for logistics automation and intelligent facilities.',
            order: 2,
            hasPlay: true,
            hasAwards: false,
            cols: 'col-span-3',
          },
          {
            title: 'Kinetic Pattern',
            category: 'Motion Graphics',
            description: 'High contrast kinetic visual patterns and brand motion design.',
            order: 3,
            hasPlay: false,
            hasAwards: false,
            cols: 'col-span-3',
          },
          {
            title: 'LightIS - Blueprint',
            category: 'Motion Design & 3D Blueprint',
            description: 'Technical 3D blueprint animation visualizing industrial lighting fixtures.',
            order: 4,
            hasPlay: true,
            hasAwards: false,
            cols: 'col-span-4',
          },
          {
            title: 'Sombras da Guerra',
            category: 'Stop Motion / International Film Festival Laurels',
            description: 'Award-winning animated stop motion short film screened in renowned European and Latin American film festivals.',
            order: 5,
            hasPlay: true,
            hasAwards: true,
            cols: 'col-span-8',
          },
          {
            title: 'Spotlight - Atmosphere Study',
            category: 'Cinematography',
            description: 'Study in minimal light falloff, tactile textures and atmospheric illumination.',
            order: 6,
            hasPlay: false,
            hasAwards: false,
            cols: 'col-span-6',
          },
          {
            title: 'Sua ideia, nossa luz',
            category: 'Commercial Nocturnal Cinematography',
            description: 'Urban nocturne advertising campaign capturing atmospheric architectural lights.',
            order: 7,
            hasPlay: true,
            hasAwards: false,
            cols: 'col-span-3',
          },
          {
            title: 'Reflections',
            category: 'Macro Detail',
            description: 'Macro detail and geometric radial textures in architectural lighting.',
            order: 8,
            hasPlay: false,
            hasAwards: false,
            cols: 'col-span-3',
          },
        ];

        for (const proj of initialProjects) {
          await (strapi.documents('api::project.project') as any).create({
            data: proj,
            status: 'published',
          });
        }
      }
    } catch (err) {
      console.warn('[Bootstrap] Auto-seed or permission notice:', err);
    }
  },
};
