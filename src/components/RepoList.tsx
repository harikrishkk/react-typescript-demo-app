import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RootState } from '../state';

const RepoList: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const { searchRepos } = useActions();
  const { data, error, loading } = useTypedSelector((state) => state.repos);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepos(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button> Search</button>
      </form>
      {error && <h1> Error!</h1>}
      {loading && <p> Loading..</p>}
      {!error && !loading && data.map((item) => <p key={item}> {item}</p>)}
    </div>
  );
};
export default RepoList;
