const nodePath = require("path");

module.exports = function (_ref) {
  const t = _ref.types;
  return {
    name: "babel-plugin-import-json-value",
    visitor: {
      ImportDeclaration(path, file) {
        const { source, specifiers } = path.node;
        if (nodePath.extname(source?.value) === ".json") {
          const valObj = getJsonValue(file.filename, source.value);
          let decObj = {};
          for (const specifier of specifiers) {
            const [[declare, importName]] = getDeclare(specifier);
            decObj = {
              ...decObj,
              ...{
                [declare]:
                  importName === undefined || importName === "default"
                    ? valObj
                    : valObj[importName],
              },
            };
          }
          replaceStatement(path, t, decObj);
        }
      },
      VariableDeclaration(path, file) {
        const {
          kind,
          declarations: [{ id, init }],
        } = path.node;
        if (
          init?.type === "CallExpression" &&
          init.callee?.name === "require" &&
          init.arguments?.[0].type === "StringLiteral" &&
          nodePath.extname(init.arguments[0].value) === ".json"
        ) {
          const valObj = getJsonValue(file.filename, init.arguments[0].value);
          let decObj = {};
          for (const [declare, importName] of getDeclare(id)) {
            decObj = {
              ...decObj,
              ...{
                [declare]:
                  importName === undefined || importName === "default"
                    ? valObj
                    : valObj[importName],
              },
            };
          }
          replaceStatement(path, t, decObj);
        } else if (init?.type === "MemberExpression") {
          const temObj = getMemberNodePath(init);
          if (
            temObj?.path &&
            temObj?.keyList &&
            nodePath.extname(temObj.path) === ".json"
          ) {
            let valObj = getJsonValue(file.filename, temObj.path);
            temObj.keyList.forEach((val) => {
              valObj = valObj[val];
            });
            let decObj = {};
            for (const [declare, importName] of getDeclare(id)) {
              decObj = {
                ...decObj,
                ...{
                  [declare]:
                    importName === undefined || importName === "default"
                      ? valObj
                      : valObj[importName],
                },
              };
            }
            replaceStatement(path, t, decObj);
          }
        }
      },
    },
  };
};

function getJsonValue(filename, relative) {
  return require(nodePath.join(nodePath.dirname(filename), relative));
}

function getDeclare(specifier) {
  switch (specifier.type) {
    case "ImportSpecifier":
      return [[specifier.local.name, specifier.imported.name]];
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
      return [[specifier.local.name]];
    case "Identifier":
      return [[specifier.name]];
    case "ObjectPattern":
      let res = [];
      for (const iterator of specifier.properties) {
        res.push([iterator.value.name, iterator.key.name]);
      }
      return res;
  }
}

function replaceStatement(path, t, obj) {
  path.replaceWith(
    t.variableDeclaration(
      "const",
      Object.keys(obj).map((declare) => {
        const temVal = obj[declare];
        return t.variableDeclarator(
          t.identifier(declare),
          typeof temVal === "string"
            ? t.stringLiteral(temVal)
            : typeof temVal === "undefined"
            ? t.identifier("undefined")
            : t.stringLiteral(JSON.stringify(temVal))
        );
      })
    )
  );
}

function getMemberNodePath(node, obj = { path: undefined, keyList: [] }) {
  if (node.type === "MemberExpression") {
    obj.keyList.unshift(
      node.property.type === "StringLiteral"
        ? node.property.value
        : node.property.name
    );
    return getMemberNodePath(node.object, obj);
  } else if (node.type === "CallExpression") {
    obj.path = node.arguments[0].value;
    return obj;
  }
}
