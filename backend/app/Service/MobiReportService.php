<?php

namespace App\Service;

use Illuminate\Support\Facades\Http;

class MobiReportService {

    const URL_API = 'http://50.116.59.58/';

    /**
     * @param string $url
     * @param array $params
     * @param int $timeout
     * @return mixed
     * @throws \Exception
     */
    public function request(string $url, array $params = array(), int $timeout = 60) : mixed{
        $headers = [];
//        if(!empty($this->key_app)) $headers['AppKey'] = $this->key_app;

        $response = Http::withHeaders($headers)
            ->connectTimeout(10)
            ->withoutVerifying()
            ->timeout($timeout)
            ->post(static::URL_API.$url, $params);

        if($response->status() == 404) throw new \Exception("{$url} não encontrado na apiv3!");

        if (!$response->successful()) throw new \Exception('Erro na geração de relatório, MobiReport.', $response_data->code ?? 500);

        $headers = []; $headers_response = $response->headers();
        if(isset($headers_response['Content-Type'])) $headers['Content-Type'] = $headers_response['Content-Type'];

        return response($response->body(), 200, $headers);

    }

}
