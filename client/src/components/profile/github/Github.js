import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGithubRepos } from "../../../actions/profile";

const Github = ({ repos }) => {
  console.log("repos", repos);

  return (
    <>
      <div>
        <div class="profile-github">
          <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2>
          {repos.length > 0 &&
            repos.map((rep, index) => {
              return (
                <div key={index} class="repo bg-white p-1 my-1">
                  <div>
                    <h4>
                      <a
                        href={rep.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {rep.name}
                      </a>
                    </h4>
                    <p>{rep.description}</p>
                  </div>
                  <div>
                    <ul>
                      <li class="badge badge-primary">
                        Stars: {rep.stargazers_count}
                      </li>
                      <li class="badge badge-dark">
                        Watchers: {rep.watchers_count}
                      </li>
                      <li class="badge badge-light">
                        Forks: {rep.forks_count}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Github;
