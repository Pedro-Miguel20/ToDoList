const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-4 w-full">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground">
            © 2024 ToDoList. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termos
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
