# @ref https://github.com/srid/monorepo-nix-template
{
  description = "top level monorepo flake";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";

    flake-utils.url = "github:numtide/flake-utils";
    flake-utils.inputs.nixpkgs.follows = "nixpkgs";
  };
  outputs =
    { nixpkgs, self, ... }@inputs:
    inputs.flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = (import nixpkgs) {
          inherit system;
        };
        # @see https://github.com/direnv/direnv/issues/73#issuecomment-2478178424
        # Function to create script
        mkScript =
          name: text:
          let
            script = pkgs.writeShellScriptBin name text;
          in
          script;

        # Define your scripts/aliases
        # FIXME: pnpx/npx = big bad on load time
        scripts = [
          (mkScript "nx" ''pnpx nx "$@"'')
        ];

      in
      {
        # INFO: nix build
        # TODO:
        packages = {
        };

        # INFO: nix run
        # TODO:
        apps = {
        };

        # INFO: nix develop
        devShell = pkgs.mkShell {
          buildInputs = [
            # put needed packages here
          ]
          ++ scripts;
          packages = with pkgs; [
            just
            nodejs_22
            nodePackages.pnpm
            biome
          ];
          shellHook = ''
            echo "View flake outputs with 'nix flake show'"
          '';
        };
      }
    );
}
