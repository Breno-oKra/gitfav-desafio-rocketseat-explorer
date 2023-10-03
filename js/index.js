import { search, btnFav } from "./camps.js";
import { apiGit } from "./apiGit.js";
export class GitApi {
  constructor(root) {
    this.root = document.querySelector(root);
    this.tbodyTable = this.root.querySelector("table tbody");
    this.bd()
    this.add();
  }
  bd(){
    this.entry = JSON.parse(localStorage.getItem('@user-favorite')) || []
    this.load()
  }
  save(data){
    localStorage.setItem('@user-favorite', JSON.stringify(data))
  }
  add() {
    btnFav.onclick = async () => {
      
      try {
        const data = await apiGit.search(search.value);
        const findUser = this.entry.find((item) => item.login === data.login);

        if (findUser) {
          throw new Error("Usuario já Existe");
        }
        if (data.login === undefined) {
          throw new Error("Usuario não encontrado");
        }
        this.entry = [data, ...this.entry];
        this.save(this.entry)
        this.load();
      } catch (error) {
        alert(error.message);
      }
    };
  }
  load() {
    this.removeTrs();
    if (this.entry.length === 0) {
      this.noUsers();
      return;
    }
    this.entry.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <tr>
                <td class="user">
                    <img src="https://github.com/${user.login}.png" alt="" srcset="">
                    <div>
                        <span>${user.name}</span>
                        <p>/${user.login}</p>
                    </div>
                </td>
                <td class="numMobile">
                ${user.public_repos}
                </td>
                <td class="numMobile">
                ${user.followers}
                </td>
                <td class="remove">
                    <button>Remover</button>
                </td>
            </tr>
          `;
      tr.querySelector(".remove").onclick = () => {
        this.removeUser(user);
      };
      this.tbodyTable.append(tr);
    });
  }
  removeUser(user) {
    const usuario = this.entry.find((item) => item === user);
    const data = this.entry.filter((item) => item !== usuario);
    this.entry = data;
    this.save(this.entry)
    this.load();
  }
  removeTrs() {
    this.tbodyTable.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
  noUsers() {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <tr>
        <td colspan="4">
            <div  class="noUser">
                <img src="./assets/Estrela.svg" alt="" />
                <span>Nenhum favorito ainda</span>
            </div>
        </td>
    </tr>`;
    this.tbodyTable.append(tr);
  }
}

new GitApi("#app");
