{
  description = "Portfolio monorepo with Next.js, FastAPI, and Three.js";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        python = pkgs.python312;
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            python
            python.pkgs.uvicorn
            uv
          ];

          shellHook = ''
            export UV_PYTHON="${python}/bin/python3"
            echo "Portfolio dev shell"
            echo "  frontend: cd frontend && npm install && npm run dev"
            echo "  backend : cd backend && uv sync && uv run uvicorn app.main:app --reload"
          '';
        };
      });
}
