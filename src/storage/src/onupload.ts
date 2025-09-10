#!/bin/bun

const input = (await Bun.stdin.json()) as {
  Type: "post-finish";
  Event: {
    Upload: {
      ID: string;
      Size: number;
      SizeIsDeferred: boolean;
      Offset: number;
      MetaData: {
        filename: string;
        filetype: "image/png";
      };
      IsPartial: boolean;
      IsFinal: boolean;
      PartialUploads: null;
      Storage: {
        InfoPath: string;
        Path: string;
        Type: "filestore";
      };
    };
  };
};

if (!input.Event.Upload.MetaData.filename) {
  Bun.stdout.write(`{"RejectUpload": true}`);
} else {
  Bun.stdout.write("{}");

  const uploadedFile = Bun.file(input.Event.Upload.Storage.Path);
  await Bun.write(
    `/data/files/${input.Event.Upload.MetaData.filename.replaceAll("..", "")}`,
    uploadedFile
  );
}

await Promise.all([
  Bun.file(input.Event.Upload.Storage.Path).unlink(),
  Bun.file(input.Event.Upload.Storage.InfoPath).unlink(),
]);
