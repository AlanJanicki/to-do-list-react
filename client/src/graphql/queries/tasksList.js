import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query Query($input: QueryInput) {
    getTasks(input: $input) {
      tasks {
        body
        createdAt
        done
        finishDate
        id
        priority
      }
      tasksAmount
      tasksFilteredAmount
    }
  }
`;
