export const postView = () => {
<div class="post card">
  <div class="card-header">
    <img src="img/perfil.jpg" class='post-profile-picture rounded' alt="profile-picture">
    <span id='post-author-name'>PROFESORA ABCDEF</span> 
       
  </div>

  <div class="card-text">
    <label for="post-text-posted"></label>
    <textarea class="posted-post" name="post-text-posted" readonly></textarea>
  </div>

  <div class="card-footer">
    <button type="button" id="like-post" class="post-btn"><i class="fas fa-thumbs-up"></i> Me gusta</button>
    <button class="post-btn comment-post"><i class="fas fa-comments"></i> Comentar</button>
  </div>
</div>

}

