import { ActionContext } from 'vuex'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { State, User } from '../types/store'
import { INCREMENT, GET_USER } from './constants'
import RequestBuilder, { Endpoint, RequestResult } from '@/lib/RequestBuilder'

const actions = {
  [INCREMENT](context: ActionContext<State, State>){
   context.commit(INCREMENT)
  },
  [GET_USER](context: ActionContext<State, State>){

    /*
    Example use of the RequestBuilder class. Uses of the class can be
    separated out into there own file for reuse.
    RequestBuilder.getRequest() returns type TaskEither<RequestResult, RequestResult>
    */

    const requestBuilder = new RequestBuilder()
    const req = requestBuilder
      .get()
      .url(Endpoint.User)
      .auth(false)
      .getRequest()

    /*
    Example use of pipe and TaskEither.map().
    Uses of this can be separated out into a separate file
    for reuse and improve modularity
    */

    pipe(
      req,
      TE.map<RequestResult, User[]>((result: RequestResult) => result.json<any>().map((u: any) => ({
        ...u, ...{ profile: { maritalStatus: u.profile.marital_status}}
      })))
    )().then(e => pipe(
      e,
      E.fold(
        error => console.error('Error making this request.', error),
        (result: User[]) => context.commit(GET_USER, result)
      )
    ))
  }
}

export default actions