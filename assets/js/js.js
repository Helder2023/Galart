
    // =============================================
    // DROPDOWN DO USUÁRIO
    // =============================================
    var navUser = document.getElementById('navUser');
    var navUserTrigger = document.getElementById('navUserTrigger');
    var navUserDropdown = document.getElementById('navUserDropdown');

    if (navUserTrigger) {
      navUserTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        navUser.classList.toggle('active');
      });
    }

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function (e) {
      if (navUser && !navUser.contains(e.target)) {
        navUser.classList.remove('active');
      }
    });

    function closeDropdown() {
      if (navUser) navUser.classList.remove('active');
    }

    // Fechar com tecla ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (navUser) navUser.classList.remove('active');
        closeAllModals();
      }
    });

    // =============================================
    // MODAIS
    // =============================================
    function closeAllModals() {
      document.querySelectorAll('.modal-overlay.active').forEach(function (m) {
        m.classList.remove('active');
      });
      document.body.classList.remove('modal-open');
    }

    window.openProfileModal = function () {
      document.getElementById('profileModal').classList.add('active');
      document.body.classList.add('modal-open');
    };

    window.openPasswordModal = function () {
      document.getElementById('passwordModal').classList.add('active');
      document.body.classList.add('modal-open');
      // Limpar campos
      document.getElementById('passwordForm').reset();
      document.getElementById('passwordStrength').className = 'password-strength';
      document.getElementById('passwordFeedback').textContent = '';
    };

    window.closeModal = function (modalId) {
      document.getElementById(modalId).classList.remove('active');
      document.body.classList.remove('modal-open');
    };

    // Fechar modais ao clicar no overlay
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === this) closeModal(this.id);
      });
    });

    // =============================================
    // PREVIEW DE AVATAR
    // =============================================
    window.previewProfileAvatar = function (event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById('profileAvatarPreview').src = e.target.result;
          // Atualizar também o avatar da navbar
          var navAvatar = document.querySelector('.nav-user-avatar');
          if (navAvatar) navAvatar.src = e.target.result;
          var dropdownAvatar = document.querySelector('.dropdown-avatar');
          if (dropdownAvatar) dropdownAvatar.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    // =============================================
    // FORÇA DA SENHA
    // =============================================
    function checkPasswordStrength() {
      var password = document.getElementById('newPassword').value;
      var strengthBar = document.getElementById('passwordStrength');
      var feedback = document.getElementById('passwordFeedback');

      var score = 0;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
      if (password.length >= 12) score++;

      strengthBar.className = 'password-strength';
      feedback.className = 'password-feedback';

      if (score <= 2) {
        strengthBar.classList.add('weak');
        feedback.classList.add('weak');
        feedback.textContent = 'Senha Fraca';
      } else if (score <= 3) {
        strengthBar.classList.add('medium');
        feedback.classList.add('medium');
        feedback.textContent = 'Senha Média';
      } else {
        strengthBar.classList.add('strong');
        feedback.classList.add('strong');
        feedback.textContent = 'Senha Forte';
      }
    }

    // =============================================
    // SALVAR PERFIL
    // =============================================
    window.saveProfile = function (event) {
      event.preventDefault();

      var firstName = document.getElementById('profileFirstName').value.trim();
      var lastName = document.getElementById('profileLastName').value.trim();
      var email = document.getElementById('profileEmail').value.trim();
      var phone = document.getElementById('profilePhone').value.trim();
      var location = document.getElementById('profileLocation').value;

      if (!firstName || !lastName || !email) {
        showToast('Preencha todos os campos obrigatórios.', 'error');
        return false;
      }

      // Atualizar nome na navbar
      var fullName = firstName + ' ' + lastName;
      var navName = document.querySelector('.nav-user-name');
      if (navName) navName.textContent = fullName;

      var dropdownName = document.querySelector('.dropdown-name');
      if (dropdownName) dropdownName.textContent = fullName;

      // Atualizar localização
      var navRole = document.querySelector('.nav-user-role');
      if (navRole) navRole.textContent = 'Artista • ' + location;

      closeModal('profileModal');
      showToast('Perfil atualizado com sucesso!', 'success');
      return false;
    };

    // =============================================
    // SALVAR SENHA
    // =============================================
    window.savePassword = function (event) {
      event.preventDefault();

      var currentPassword = document.getElementById('currentPassword').value;
      var newPassword = document.getElementById('newPassword').value;
      var confirmPassword = document.getElementById('confirmNewPassword').value;

      if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('Preencha todos os campos.', 'error');
        return false;
      }

      if (newPassword.length < 8) {
        showToast('A nova senha deve ter pelo menos 8 caracteres.', 'error');
        return false;
      }

      if (newPassword !== confirmPassword) {
        showToast('As senhas não coincidem.', 'error');
        return false;
      }

      // Simulação de sucesso
      closeModal('passwordModal');
      showToast('Senha alterada com sucesso!', 'success');
      return false;
    };

    // =============================================
    // TOAST
    // =============================================
    function showToast(message, type) {
      var toast = document.getElementById('toast');
      var toastMessage = document.getElementById('toastMessage');
      var icon = toast.querySelector('i');

      toast.className = 'toast ' + (type || 'info');
      toastMessage.textContent = message;
      icon.className = 'fas';
      if (type === 'success') icon.className += ' fa-check-circle';
      else if (type === 'error') icon.className += ' fa-exclamation-circle';
      else icon.className += ' fa-info-circle';

      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); }, 4000);
    }
    (function () {
      'use strict';

      // --- MENU MOBILE ---
      const mobileMenuToggle = document.getElementById('mobileMenuToggle');
      const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
      const mobileMenuClose = document.getElementById('mobileMenuClose');
      const body = document.body;

      function openMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        body.classList.add('menu-open');
      }

      function closeMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        body.classList.remove('menu-open');
      }

      if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMenu);
      }

      if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
      }

      if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function (e) {
          if (e.target === mobileMenuOverlay) {
            closeMenu();
          }
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
          closeMenu();
        }
      });

      const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      // --- ANIMAÇÕES DE SCROLL ---
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

      const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
      document.querySelectorAll('.reveal-text').forEach(el => textObserver.observe(el));

      // --- EFEITO SCROLL NA NAVBAR ---
      const navbar = document.querySelector('.navbar');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.style.boxShadow = '0 10px 40px rgba(229, 57, 53, 0.15)';
        } else {
          navbar.style.boxShadow = 'var(--shadow-md)';
        }
      });

    })();
