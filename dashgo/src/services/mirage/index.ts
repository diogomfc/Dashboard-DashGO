import {createServer, Factory, Model, Response} from 'miragejs';
import { faker } from '@faker-js/faker';

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
      models: {
        user: Model.extend<Partial<User>>({})
      },

      factories: {
        user: Factory.extend({
          id(i: number){
            return i + 1;
          },
          name(i: number) {
            return `User ${i + 1}`;
          },
          email(){
            return faker.internet.email().toLowerCase();
          },
          created_at() {
            return faker.date.recent(10);
          },
        })
      },

      seeds(server) {
        server.createList('user', 100);
      },

      routes() {
        this.namespace = 'api';
        this.timing = 750;
        this.get('/users', function(schema, request) {
           const {page = 1, per_page = 10} = request.queryParams;
           const user = schema.all('user');
            const total = user.length;
            const pageStart = (Number(page) - 1) * Number(per_page);
            const pageEnd = pageStart + Number(per_page);
            const users = this.serialize(user).users.slice(pageStart, pageEnd);
            return new Response(
              200,
              {'x-total-count': String(total)},
              {users}
            );
        });
        this.get('/api/users/:id');
        this.post('/users');
        this.namespace = '';
        this.passthrough();
      }
    
  });

  return server;
}